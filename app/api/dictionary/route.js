import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');
  const filePath = path.join(process.cwd(), 'data', `${lang}.json`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
