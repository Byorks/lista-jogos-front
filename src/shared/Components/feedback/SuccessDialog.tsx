import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
};

const SuccessDialog = ({
  open,
  onOpenChange,
  title,
  description,
}: SuccessDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              {/*asChild permite usar o próprio elemento React no lugar do
              padrão do Radix*/}
              <motion.div
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full max-w-md rounded-3xl border border-[#211f36] bg-[#0C0E1D] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#161827] hover:text-white"
                      aria-label="Fechar modal"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                  <motion.div
                    className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#51FAAA]/15"
                    initial={{ scale: 0.7, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.12,
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                      }}
                    >
                      <Check className="h-10 w-10 text-[#51FAAA]" />
                    </motion.div>
                  </motion.div>

                  <Dialog.Title className="text-center text-xl font-bold text-white">
                    {title}
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-center text-sm text-gray-400">
                    {description}
                  </Dialog.Description>

                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#51FAAA] to-[#FF81FF] px-5 py-3 font-bold text-[#0C0E1D] transition-opacity hover:opacity-90"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default SuccessDialog;
// continuar daqui
