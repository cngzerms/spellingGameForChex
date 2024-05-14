import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/en'); // Varsayılan olarak İngilizce sayfasına yönlendir
}
