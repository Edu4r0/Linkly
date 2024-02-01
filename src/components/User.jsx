const { signOut } = await import("auth-astro/client");
import {
  PlusIcon,
  ArchiveIcon,
  ExclamationTriangleIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function User({ session }) {
  function LogoutAccount() {
    signOut("github");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:opacity-80" href="/dash">
          <div className="flex gap-2">
            <span>#</span>
            <span>{session?.user.name}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="gap-2 flex flex-col w-[200px]">
        <DropdownMenuItem className="w-full hover:bg-white/10">
          <a className="flex gap-4 items-center" href="/dash/#create">
            <PlusIcon />
            Create new link
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-4 w-full hover:bg-white/10">
          <a className="flex gap-4 items-center" href="/dash">
            <ArchiveIcon /> Dashboard
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-4 w-full hover:bg-white/10">
          <a className="flex gap-4   items-center" href="">
            <ExclamationTriangleIcon /> Report a bug
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => LogoutAccount()}
          className="flex gap-4 w-full hover:bg-white/10 cursor-pointer"
        >
          <ExitIcon /> Sing Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default User;
