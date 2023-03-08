import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <header aria-label="Site Header" className="shadow-sm">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="  h-10 w-32 rounded-lg bg-gray-200 grid place-items-center ">
                ゆづしょっぷ
              </span>
            </Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            <a className="text-gray-500" href="">
              About
            </a>
            <a className="text-gray-500" href="">
              Blog
            </a>
            <a className="text-gray-500" href="">
              Projects
            </a>
            <a className="text-gray-500" href="">
              Contact
            </a>
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
            {/* <a
              className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
              href=""
            >
              Log in
            </a>

            <a
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
              href=""
            >
              Sign up
            </a> */}

            {router.pathname !== "/cart" && (
              <Link
                href="/cart"
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
              >
                レジに進む
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              {/* <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg> */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
