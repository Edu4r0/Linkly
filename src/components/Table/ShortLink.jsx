import Copy from "../icons/Copy";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function ShortLink({ item }) {
  const DOMAIN = "http://localhost:4321/s/";
  const copyToClipboard = async (txt) => {
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], { type: "text/plain" }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }
    toast({
      title: `🚀 ${DOMAIN} ${item.shortLink || item.short_url}`,
      description: "Copy To Clipboard",
    });
  };
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={async () =>
          await copyToClipboard(`${DOMAIN}${item.shortLink || item.short_url}`)
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
