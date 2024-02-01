const { signIn } = await import("auth-astro/client");
function login() {
  function LoginAccount() {
    signIn("github");
  }
 
  return (
    <div className="dark flex gap-x-5">
      <button onClick={() => LoginAccount()} className="flex hover:opacity-80 ">
        <span>Login</span>
        <div>
          <svg
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="1.5"
            className="lucide-icon lucide lucide-External link ml-1 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <>
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </>
          </svg>
        </div>
      </button>
      <hr className="border border-neutral-200 h-full" />
      <div className="flex flex-col">

      </div>
    </div>
  );
}

export default login;
