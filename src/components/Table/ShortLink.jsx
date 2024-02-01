import Copy from "../icons/Copy";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import copyToClipboard from "@/utils/copy";


function ShortLink({ item }) {
  const DOMAIN = "https://linkly-url.vercel.app/s/";
  const text = `${DOMAIN}${item.shortLink || item.short_url}`
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={async () =>
          await copyToClipboard(text,toast)
        }
        className="flex justify-between gap-1 w-full"
      >
        {`${DOMAIN}${item.shortLink || item.short_url}`}
        <Copy />
      </button>
      <Toaster />
    </div>
  );
}

export default ShortLink;
