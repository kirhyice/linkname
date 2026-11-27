import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 컬렉션 문서 형태: { _id: 링크 id, count: 클릭 수 }
type ClickDoc = { _id: string; count: number };

const linkIds = profile.links.map((link) => link.id);

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭 수를 한 번에 반환합니다. 기록이 없는 링크는 0.
export async function GET() {
  try {
    const docs = await (await clicksCollection()).find({ _id: { $in: linkIds } }).toArray();
    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[GET /api/clicks]", err);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 특정 링크의 클릭 수를 1 늘리고, 갱신된 값을 반환합니다.
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  // 프로필에 등록된 링크만 집계해 임의의 키가 DB에 쌓이지 않게 합니다.
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await clicksCollection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (err) {
    console.error("[POST /api/clicks]", err);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
