import { Loader2 } from "lucide-react";
const Loader = ({ styles }: { styles: string }) => {
  return (
    <div className={`${styles} animate-spin text-zinc-500`}>
      <Loader2 />
    </div>
  );
};

export default Loader;
