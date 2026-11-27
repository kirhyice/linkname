import { MongoClient, type Db } from "mongodb";

// 개발 모드의 핫 리로드 때마다 새 연결이 쌓이지 않도록 전역에 클라이언트를 보관합니다.
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패 시 다음 요청에서 다시 시도할 수 있도록 캐시를 비웁니다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

// DB 이름은 MONGODB_URI 경로(…mongodb.net/linknamu)에 지정된 값을 사용합니다.
export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}
