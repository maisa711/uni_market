"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";


const ProfileInfo = ({
    profileId,
    image,
    user,
    classNameImage,
    classNameText,
    isImageFirst,
}: any) => {

    return (
        <>
            {isImageFirst ? (
                <>
                    <Link href={`/profile/${profileId}`}>
                        <Image
                            src={image}
                            width={40}
                            height={40}
                            alt="Profile Picture"
                            className={classNameImage}

                        />
                    </Link>
                    <h3 className={classNameText}>{user}</h3>

                </>
            ) : (
                <>
                    <h3 className={classNameText}>{user}</h3>
                    <Link href={`/profile/${profileId}`}>
                        <Image
                            src={image}
                            width={40}
                            height={40}
                            alt="Profile Picture"
                            className={classNameImage}
                        />
                    </Link>
                </>
            )}
        </>
    );
};

export default ProfileInfo;
