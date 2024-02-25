"use client";

import React, { useState } from "react";
import Image from 'next/image'
import maleAvatar from '@/images/male_avatar.png'
import femaleAvatar from '@/images/female_avatar.png'


export default function OnlineUser({ username, gender, isMe }) {


    return (

        <div
            className={`box-border h-12 w-full pl-4 bg-orange-600 rounded-xl flex flex-row items-center justify-between p-6 mb-4
          ${isMe ? 'border-white bg-gradient-to-br border-2 from-blue-400 to-blue-500' : ''}`}>
            <p className="font-bold">{username}</p>
            <Image
                src={gender === 'male' ? maleAvatar : femaleAvatar}
                alt="Picture of the author"
                width={40}
                height={40}
                quality={100}
            />
        </div>
    );
}
