"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";


// navigation menu items
const navigation = [
  { name: "Products", href: "/", current: true },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);

  // profile menu dropdown items
  const profile = [
    { name: "Your Profile", href: `/profile/${session?.user?.id}`, onClick: () => { } },
    { name: "Sign out", href: "#", onClick: () => signOut() },
  ];

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData);
    };
    getProvidersData();
  }, []);

  return (
    <Disclosure as="nav" className=" bg-main-bg sticky top-0 z-10 drop-shadow-xl h-20">
      {({ open }) => (
        <>
          <div className="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full items-center">
            <div className="flex h-16 items-center justify-between w-full">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href='/'>
                  <div className="flex flex-shrink-0 items-center">
                    {/* Logos*/}
                    <Image
                      src={'/logo.png'}
                      width={40}
                      height={40}
                      className="block h-10 w-auto"
                      alt="logo"
                    />

                  </div>
                </Link>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-accent text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {/*check if user is logged in*/}
                {session?.user ? (
                  <>
                    {/*if the user is logged in show add product and profile menu*/}
                    <ProductModal />
                    <Menu as="div" className="relative ml-3">
                      <div>
                        {/*profile icon*/}
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={session?.user?.image as any}
                            alt=""
                            width={30}
                            height={2}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {profile.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={item.onClick}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>

                ) : (
                  <>
                  {/*if the user is not logged in show Log in button*/}
                    <Menu as="div" className="relative ml-3">
                      {providers &&
                        Object.values(providers).map((provider: any) => (
                          <Menu.Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                          >
                            <p>Log in</p>
                          </Menu.Button>
                        ))}
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-main-bg">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-accent text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
