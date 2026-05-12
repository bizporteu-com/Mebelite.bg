import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="font-display text-6xl">404</div>
      <h1 className="mt-2 text-2xl">Страницата не съществува</h1>
      <p className="mt-2 max-w-md text-ink-500">Възможно е продуктът да е свален или линкът да е остарял.</p>
      <Link href="/" className="btn-primary mt-6">Към началната страница</Link>
    </div>
  );
}
