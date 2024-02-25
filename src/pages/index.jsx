
import Image from "next/image";
import React, { useState } from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import maleAvatar from '@/images/male_avatar.png'
import femaleAvatar from '@/images/female_avatar.png'
import { useRouter } from 'next/router'



export default function Home() {

  const [state, setState] = useState(false);
  const [username, setUserName] = useState('');
  const [gender, setGender] = useState('male');
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const router = useRouter();

  const changeGender = () => {
    if (gender == 'male')
      setGender('female');
    else setGender('male');

  }



  const login = (e) => {

    e.preventDefault()
    alert('Welcome ' + username)
    setTimeout(() => {
      router.push({
        pathname: '/chat',
        query: { username: username, gender: gender },
      }).then(() => router.reload());

    }, 700);

  }

  return (


    <main className="flex min-h-screen flex-col items-center p-10 font-Montserrat bg-gray-900 text-white " >


      <p className="font-bold text-2xl text-center mb-16 ">Welcome To MyChat!</p>

      <div className="flex flex-col w-30 items-center border-spacing-5">


        <p>Please choose your username:</p>

        <form className="flex flex-col items-center" onSubmit={login} >

          <input
            name="user"
            className="flex flex-col m-4 rounded-xl pl-4 w-5/6 text-black focus:outline-0"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />

          <div className="flex flex-row mb-8 justify-center items-center">

            <div className="flex flex-col w-300 items-center text-center justify-center">

              <Image
                className={`rounded-3xl   ${gender == 'female' ? 'border-2 border-white' : {}}`}
                src={femaleAvatar}
                alt="female"
                width={38}
                height={100}
                quality={100}
              />
              <label className={`text-center rounded mt-3 ${gender == 'female' ? 'bg-gradient-to-br from-pink-400 to-pink-700' : {}} `}>Female</label>
            </div>



            <Switch value={gender} onChange={changeGender} className="mr-3" {...label} defaultChecked sx={{

              '& .css-jsexje-MuiSwitch-thumb': {
                backgroundColor: 'rgb(126, 34, 206)',
                borderRadius: 30,
              },

              '& .MuiSwitch-track': {
                backgroundColor: '#337180',
                opacity: 1,
              },

              '& .Mui-checked+.MuiSwitch-track': {
                backgroundColor: '#5199E4',
                opacity: 0.9,
              },
            }} />
            <div className="flex flex-col items-center text-center justify-center">

              <Image
                className={`rounded-3xl   ${gender == 'male' ? 'border-2 border-white' : {}}`}
                src={maleAvatar}
                alt="male"
                width={36}
                height={40}
                quality={100}
              />
              <label className={`text-center rounded mt-3 ${gender == 'male' ? 'bg-gradient-to-br from-blue-400 to-blue-700' : {}} `}>Male</label>
            </div>
          </div>
          <button className="w-5/6 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl hover:from-purple-400 hover:to-purple-600" type="submit">Login</button>
        </form>
      </div>




    </main>
  );
}
