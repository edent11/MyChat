"use client";

import React, { useState } from "react";
import Image from 'next/image'
import maleAvatar from '@/images/male_avatar.png'
import femaleAvatar from '@/images/female_avatar.png'

export default function Message({ message, username, gender, isMe }) {


    return (

        <div className={` bg-gradient-to-br flex flex-row rounded-3xl p-2 mb-4 w-fit ${isMe ? ' from-blue-400 to-blue-600' : 'from-purple-500 to-purple-700'}`}>
            <div className="flex flex-row items-center float-end">
                {/* <p className="inline-block text-left text-xs  ">Deliverd By Eden
                </p> */}
                <Image
                    className="mr-4"
                    src={gender === 'male' ? maleAvatar : femaleAvatar}
                    alt="Picture of the author"
                    width={30}
                    height={30}
                    quality={100}
                />
            </div>

            <div>

                <p className="text-center text-sm">{message}</p>

                <p className="text-center text-xs/[18px] text-gray-200">Delivered By {username}
                </p>

            </div>



        </div>
    );
}
