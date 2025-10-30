import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-between py-8 px-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col  w-full gap-6 sm:items-start">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Book late, <span className="text-amber-600">save great.</span>
          </h1>
          <SearchForm/>
        </div>
      </main>
    </div>
  );
}
