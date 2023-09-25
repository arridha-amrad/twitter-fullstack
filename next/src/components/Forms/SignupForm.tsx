'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import FloatingLabelInput from '../input/FloatingLabelInput';
import Link from 'next/link';
import SelectInput from '../input/SelectInput';

const months = [
  'January',
  'February',
  'March',
  'April',
  'Mei',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]

export default function SignUpForm() {
  const [arrDays, setArrDays] = useState<string[]>([])

  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const listDay = useMemo(() => {
    const idx = months.findIndex((month) => month === selectedMonth)
    const dayLength = days[idx] + 1
    const listDays = [...Array(dayLength).fill("").map((_, i) => i.toString())]
    listDays.shift()
    return listDays
  }, [selectedMonth])
  
  const [selectedDay, setSelectedDay] = useState<string>(listDay[0])
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ok');
  };

  useEffect(() => {
    const date = new Date()
console.log(date.getFullYear())
  }, [])

  // useEffect(() => {
  //   setSelectedDay("1")
  //   const idx = months.findIndex((month) => month === selectedMonth)
  //   const dayLength = days[idx] + 1
  //   const listDays = [...Array(dayLength).fill("").map((_, i) => i.toString())]
  //   listDays.shift()
  //   setArrDays(listDays)
  // }, [selectedMonth])

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-normal gap-4">
        <FloatingLabelInput
          className="flex-1"
          id="firstName"
          labelText="First Name"
        />
        <FloatingLabelInput
          className="flex-1"
          id="lastName"
          labelText="Last Name"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <SelectInput
          label="Month"
          options={months}
          selected={selectedMonth}
          setSelected={setSelectedMonth}
        />
        <SelectInput
          label="Day"
          options={listDay}
          selected={selectedDay}
          setSelected={setSelectedDay}
        />
      </div>
      {/* <FloatingLabelInput id="username" labelText="Username" />
      <FloatingLabelInput id="email" labelText="Email" />
      <FloatingLabelInput id="password" labelText="Password" isPassword /> */}

      <button
        type="submit"
        disabled={false}
        className="h-[45px] self-end rounded-xl bg-skin-fill px-10 font-bold transition-[hover] duration-200 ease-linear hover:brightness-75 focus:ring-2 focus:ring-skin-base focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-transparent disabled:brightness-75"
      >
        Sign Up
      </button>

      <div className="mt-4 text-center text-sm">
        <span className="">
          have an account ?
          <Link
            className="ml-2 text-sm text-skin-fill hover:underline"
            href="/home"
          >
            login
          </Link>
        </span>
      </div>
    </form>
  );
}
