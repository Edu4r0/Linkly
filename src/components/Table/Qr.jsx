import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
function Qr({ item }) {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center justify-center w-full">
            <img
              className="h-[36px] w-[36px]"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=36x36&color=75787C&bgcolor=0A0D11&data=${item.originalLink}`}
              alt={`QR ${item.icon}`}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {loading ? (
              <div className="h-10 w-10 rounded-full border-2 border-sky-600 border-r-transparent animate-spin">
                <img
                  className="hidden"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x400&color=75787C&bgcolor=0A0D11&data=${item.originalLink}`}
                  onLoad={() => handleImageLoad()}
                />
              </div>
            ) : (
              <img
                className="rounded-lg"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x400&color=75787C&bgcolor=0A0D11&data=${item.originalLink}`}
                alt={item.icon}
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Qr;
