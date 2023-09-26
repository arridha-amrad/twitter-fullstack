'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import FloatingLabelInput from '../../input/FloatingLabelInput';
import Link from 'next/link';
import SelectInput from '../../input/SelectInput';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import ButtonIcon from '../../Buttons/ButtonIcon';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import Switch from '../../Switch';
import Spinner from '../../Spinner';
import Avatar from '../../Avatar';
import { useRouter } from 'next/navigation';
import { days, loopYear, months } from './data';

export default function SignUpForm() {
  const [month, setMonth] = useState(months[0]);

  const listDay = useMemo(() => {
    const idx = months.findIndex((m) => m === month);
    const dayLength = days[idx] + 1;
    const listDays = [
      ...Array(dayLength)
        .fill('')
        .map((_, i) => i.toString()),
    ];
    listDays.shift();
    return listDays;
  }, [month]);

  const [day, setDay] = useState<string>(listDay[0]);

  const listYear = useMemo(() => {
    const isLeap = month === 'February' && day === '29';
    return loopYear(isLeap);
  }, [day, month]);

  useEffect(() => {
    setDay(listDay[0]);
    // eslint-disable-next-line
  }, [month]);

  useEffect(() => {
    setYear(listYear[0]);
    // eslint-disable-next-line
  }, [day]);

  const [year, setYear] = useState(listYear[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ day, month, year });
    setStep(4);
  };

  const [ref, { height }] = useMeasure();

  const [step, setStep] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();

  const navigateHome = () => {
    router.push('/home');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <motion.div
        key={step}
        initial={{ opacity: 0.5, height }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
        }}
      >
        <div ref={ref}>
          <div className={`flex-col gap-4 ${step === 1 ? 'flex' : 'hidden'}`}>
            <div className="w-full">
              <h1 className="mb-2 px-1 font-bold">Name</h1>
              <div className="flex gap-4">
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
            </div>
            <div>
              <h1 className="px-1 font-bold">Date of birth</h1>
              <p className="mb-3 px-1 text-sm text-skin-accent">
                It will not be displayed publicly. Confirm your own age, even if
                this account is used for business, pets, or other purposes.
              </p>
              <div className="flex w-full items-center justify-between gap-2">
                <SelectInput
                  label="Month"
                  options={months}
                  selected={month}
                  setSelected={setMonth}
                />
                <SelectInput
                  label="Day"
                  options={listDay}
                  selected={day}
                  setSelected={setDay}
                />
                <SelectInput
                  label="Year"
                  options={listYear}
                  selected={year}
                  setSelected={setYear}
                />
              </div>
            </div>
          </div>

          <div className={`${step === 2 ? 'flex' : 'hidden'} flex-col gap-3`}>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative mx-auto flex aspect-square w-[150px] cursor-pointer flex-col items-center justify-center rounded-full border border-skin-base text-skin-accent transition-all duration-300 ease-in hover:ring-4 hover:ring-skin-base"
            >
              <span className="opacity-100 transition-opacity duration-300 ease-in group-hover:opacity-0 ">
                Avatar
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in group-hover:opacity-100">
                <PlusIcon className="h-10 w-10 stroke-[4px] text-skin-fill" />
              </div>
            </div>
            <input ref={fileInputRef} type="file" hidden name="avatar" />
            <FloatingLabelInput id="username" labelText="Username" />
            <FloatingLabelInput id="email" labelText="Email" />
            <div>
              <FloatingLabelInput
                id="password"
                labelText="Password"
                isPassword
              />
              <p className="px-2 py-1 text-sm text-skin-accent">
                Password requires six characters with combination of lowercase,
                uppercase, number and special characters.
              </p>
            </div>
          </div>

          <div className={`${step === 3 ? 'flex' : 'hidden'} flex-col gap-3`}>
            <p>
              By registering, you agree to the Terms, Privacy Policy and Cookie
              Use. X may use your contact information, including your email
              address and telephone number, for the purposes described in our
              Privacy Policy.
            </p>
            <Link href="/" className="text-base text-skin-fill">
              Learn more
            </Link>
            <div className="flex items-center gap-4">
              <Switch
                enabled={enabled}
                setEnabled={setEnabled}
                srLabel="Term of service agreement"
              />
              <div
                className={`w-[60%] transition-colors duration-200 ease-linear ${
                  enabled ? 'text-skin-fill' : 'text-skin-accent'
                }`}
              >
                <h1>I agree to follow the community term of service</h1>
              </div>
            </div>
          </div>

          <div className={`${step === 4 ? 'flex' : 'hidden'} flex-col gap-3`}>
            <h2 className="text-left text-3xl leading-10">dear arridha21</h2>
            <p>
              You registration is successful. Join with our million of users.
              witnessing what&apos;s happening today.
            </p>
            <h1 className="h-[200px] text-6xl font-extrabold">
              Welcome to Twitter
            </h1>
            <div onClick={navigateHome} className="group relative mx-auto">
              <div className="absolute -inset-0.5 animate-tilt bg-skin-fill bg-gradient-to-r from-blue-500 to-green-500 opacity-75 blur transition-all duration-1000 ease-linear group-hover:opacity-100 group-hover:blur-xl group-hover:duration-500" />
              <div className="relative flex w-max cursor-pointer items-start justify-center gap-4 rounded-2xl border border-skin-base bg-skin-base px-8 py-4 group-hover:brightness-110">
                <Avatar />
                <div>
                  <h2 className="font-bold">Arridha Amrad</h2>
                  <p className="text-skin-accent">@arridha21</p>
                </div>
              </div>
            </div>
            <Link href="/" className="text-base text-skin-fill">
              Learn more
            </Link>
          </div>
        </div>
      </motion.div>

      {step <= 3 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="space-x-3">
            <span className="font-bold text-skin-base">Step:</span>
            <span>
              <span className="font-bold text-skin-fill">{step}</span> / 3
            </span>
          </div>

          <div className="flex items-center gap-5">
            <ButtonIcon
              className={`${step === 1 ? 'hidden' : 'block'}`}
              onClick={() => setStep((val) => val - 1)}
              tooltip="Back"
              icon={<ChevronLeftIcon className="h-4 w-4" />}
            />
            {step === 3 ? (
              <button
                type="submit"
                disabled={!enabled}
                className="flex h-[45px] items-center gap-3 self-end rounded-xl bg-skin-fill px-4 font-bold transition-[hover] duration-200 ease-linear hover:brightness-105 focus:ring-2 focus:ring-skin-base focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-transparent disabled:brightness-75"
              >
                <span>Sign Up</span>
                <Spinner className="h-4 w-4 text-skin-accent" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((val) => val + 1)}
                disabled={false}
                className="flex h-[45px] items-center gap-1 self-end rounded-xl bg-skin-fill px-4 font-bold transition-[hover] duration-200 ease-linear hover:brightness-75 focus:ring-2 focus:ring-skin-base focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-transparent disabled:brightness-75"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4 stroke-[3px]" />
              </button>
            )}
          </div>
        </div>
      )}

      {step !== 4 && (
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
      )}
    </form>
  );
}
