"use client";

import { useSession } from "next-auth/react";
import Form from "./Form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { categories, createProduct, updateProduct } from "@utils/utilFuncs";

// component for creating and editing products if ExistingProduct is passed in then it will be an edit modal
export default function ProductModal({ ExistingProduct }: any) {
    let [isOpen, setIsOpen] = useState(false);

    // empty product
    let prod = {
        title: "",
        description: "",
        price: 0,
        category: categories[0].name,
    };

    // if there is an existing product then set the product to that
    if (ExistingProduct) {
        prod = ExistingProduct;
    }

    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [product, setProduct] = useState(prod);

    function closeModal() {
        setIsOpen(false);
        if (!ExistingProduct) {
            setProduct(prod);
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className="flex justify-end">
            {/* if there is an existing product then it will be an edit modal button */}
            {ExistingProduct ? (
                <>
                    <p
                        onClick={openModal}
                        className=" hover:underline text-yellow-400 cursor-pointer"
                    >
                        Edit
                    </p>
                </>
            ) : (
                <>
                {/* if there is no existing product then it will be an add modal button */}
                    <button
                        className=" hidden md:flex bg-primary-btn hover:bg-primary-btn-hover  text-black py-2 px-4 rounded-full flex-row gap-2"
                        onClick={openModal}
                    >
                        <p>Add Product</p>

                        <PlusIcon className="h-6 w-6" />
                    </button>

                    <button
                        className="flex md:hidden bg-primary-btn hover:bg-primary-btn-hover  text-black py-2 px-2 rounded-full flex-row"
                        onClick={openModal}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </>
            )}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className=" z-10 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-main-bg">
                                    {ExistingProduct ? (
                                        <>
                                        {/* if there is an existing product then it will be an edit modal */}
                                            <Form
                                                type="Edit"
                                                product={product}
                                                setProduct={setProduct}
                                                submitting={submitting}
                                                handleSubmit={(e: any) =>
                                                    updateProduct(e, product, setSubmitting, closeModal)
                                                }
                                                handleCancel={closeModal}
                                            />
                                        </>
                                    ) : (
                                        <>
                                        {/* if there is no existing product then it will be an add modal */}
                                            <Form
                                                type="Create"
                                                product={product}
                                                setProduct={setProduct}
                                                submitting={submitting}
                                                handleSubmit={(e: any) =>
                                                    createProduct(
                                                        e,
                                                        product,
                                                        setSubmitting,
                                                        session,
                                                        closeModal
                                                    )
                                                }
                                                handleCancel={closeModal}
                                            />
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
