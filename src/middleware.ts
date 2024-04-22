import { NextRequest, NextResponse } from 'next/server'

// IPホワイトリスト
const IP_WHITELIST = ['xxx.xxx.xxx.xxx', '125.103.20.82']; // IPアドレスをマスクしています。

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // IPアドレスを取得
  let ip: string = request.ip ?? request.headers.get('x-real-ip') ?? '';

  // プロキシ経由の場合、x-forwarded-forヘッダーからIPアドレスを取得
  if(!ip){
    const forwardedFor = request.headers.get('x-forwarded-for');
    ip = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }

  // 取得したIPアドレスがホワイトリストに含まれているかチェックし、含まれていない場合はアクセス拒否
  if(!IP_WHITELIST.includes(ip)){
      return NextResponse.redirect('https://example.com/access-denied'); // アクセス拒否のページにリダイレクト
  }

  return res;
}
