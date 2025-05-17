// /* eslint-disable no-unused-vars */
// // src/components/ImageModal.jsx
// import { Dialog, Transition } from "@headlessui/react";
// import { X } from "lucide-react";
// import { Fragment } from "react";
// import { motion } from "react-motion";

// const ImageModal = ({ isOpen, onClose, image }) => {
//   return (
//     <Transition show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           leave="ease-in duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
//         </Transition.Child>

//         {/* Modal panel */}
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             leave="ease-in duration-200"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
//               {/* Close button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
//               >
//                 <X className="text-gray-700" />
//               </button>

//               {/* Image preview */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="w-full h-[80vh] flex items-center justify-center bg-black"
//               >
//                 <img
//                   src={image}
//                   alt="Full Preview"
//                   className="object-contain max-h-full max-w-full"
//                 />
//               </motion.div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default ImageModal;
