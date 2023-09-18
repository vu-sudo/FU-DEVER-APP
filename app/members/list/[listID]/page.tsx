"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import searchIcon from "@icon/page/member/list/search-outline.svg";
import checkIcon from "@icon/page/member/list/check-circle.svg";
import trashIcon from "@icon/page/member/list/trash.svg";

import MemberItem from "@/components/MemberItem/";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { getAllMemberInfo } from "@/apis/profile";

type pageProps = {
  params: { listID: string };
};

type memberPros = {
  id: string;
  fullname: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: {
    value: string;
  };
  isSelected: boolean;
};

function MemberList({ params }: pageProps) {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const increaseIndex = 8;
  const [allMemberData, setAllMemberData] = useState([]);
  const [members, setMembers] = useState<memberPros[]>([]);
  
  const [countListPage, setCountListPage] = useState(0);
  const pages: { param: string; startIndex: number; endIndex: number }[] = [];

  const handleGetAllMember = async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWQ4N2ZiMC1iNjIzLTRmNTEtYTRmNi1mYzljNjZlM2QxNmEiLCJpYXQiOjE2OTUwMTg4NTIsInN1YiI6IjI5NTc3ODRkLTYxNTktNDY3OC1hZWZmLWUyN2Y5ZjY2MDMwZCIsImVtYWlsIjoidnV2bzA3MDQwM0BnbWFpbC5jb20iLCJVc2VyUm9sZSI6ImFkbWluIiwicmVtZW1iZXItbWUiOiJUcnVlIiwibmJmIjoxNjk1MDE4ODUyLCJleHAiOjE2OTUwMjI0NTIsImlzcyI6Imh0dHBzOi8vZnVkZXZlcmFwaS5ic2l0ZS5uZXQvIiwiYXVkIjoiaHR0cDovL2Z1LWRldmVyLmNvbS8ifQ.Kg75_8lBCopL0ZQcWrqVBZTyXWc5xFmIN5p1pnAtSww";
      if (access_token) {
        const response = await getAllMemberInfo(access_token);
        const data = response.data;
        setCountListPage( Math.ceil(data.length / increaseIndex));
        const dataWithSelect = data.map((value: { id: string;
          fullname: string;
          avatarUrl: string;
          email: string;
          position: string;
          department: string;
          status: {
            value: string;
          };}) => {
            return ({
              ...value,
              isSelected: false,
            })
        })

        setAllMemberData(dataWithSelect);
        setMembers(dataWithSelect.slice(0, increaseIndex+1));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetAllMember();
  },[]);

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedMembers = members.map((member: any) => ({
      ...member,
      isSelected: isChecked,
    }));
    setMembers(updatedMembers);
  };

  const toggleMemberSelection = (id: string) => {
    setMembers((prevMembers: any) =>
      prevMembers.map((member: any) =>
        member.id === id
          ? { ...member, isSelected: !member.isSelected }
          : member
      )
    );
  };

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}
    >
      <div className="w-[100%] flex flex-col gap-[20px] select-none">
        <div>
          <h1 className="font-bold text-[24px] select-none pt-[20px] px-[16px]">
            All Members
          </h1>
        </div>
        <div className="flex justify-between px-[16px]">
          <div className="flex gap-[16px]">
            <div className="flex w-fit h-[38px] rounded-[10px] overflow-hidden">
              <select className="w-[84px] leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none border-slate-200 bg-gray-100 select-none ">
                <option value="All" className="">
                  All
                </option>
                <option value="All" className="">
                  All
                </option>
                <option value="All" className="">
                  All
                </option>
              </select>
              <input
                type="search"
                className="w-[392px] border-y-2 border-r-2 border-l-none border-slate-200 select-none outline-none"
              />
              <div className="w-[42px] h-[38px] bg-primaryBlue flex items-center justify-center cursor-pointer">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  className="w-[24px] h-[38px]"
                />
              </div>
            </div>
            <div className="flex gap-[16px] px-[16px] border-l-[2px] border-slate-200">
              <Image
                src={checkIcon}
                alt="checkIcon"
                className="w-[24px] h-[38px] cursor-pointer"
              />
              <Image
                src={trashIcon}
                alt="trashIcon"
                className="w-[24px] h-[38px] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-[12px]">
            <Button
              textContent={"Add member"}
              icon={"add"}
              iconPosition={"left"}
              backgroundColor={"bg-green-700"}
              href={""}
              method={() => {}}
              tailwind={"text-white"}
            ></Button>
            <Button
              textContent={"Import"}
              icon={"import"}
              iconPosition={"left"}
              backgroundColor={"bg-white"}
              href={""}
              method={() => {}}
              tailwind={"text-black border-2"}
            ></Button>
          </div>
        </div>

        <div>
          <div
            id="tableHeader"
            className="flex border-b-2 bg-slate-50 h-[50px]"
          >
            {/* checkbox */}
            <div className="w-[48px] flex items-center justify-center">
              <input
                id="select_all"
                type="checkbox"
                value="Name"
                checked={selectAll}
                onChange={(e) => handleSelectAllChange(e)}
                className="outline-none border-1 border-slate-200 rounded-[4px] focus:ring-offset-[shadow] cursor-pointer"
              />
            </div>
            {/*Name*/}
            <div className="w-[68px] flex items-center justify-center text-[12px] uppercase">
              <p>Name</p>
            </div>
            <div className="flex w-[276px] items-center justify-center text-[12px]"></div>
            {/* position */}
            <div className="w-[200px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Position</p>
            </div>
            {/* department */}
            <div className="w-[180px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Department</p>
            </div>
            {/* status */}
            <div className="w-[100px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Status</p>
            </div>
          </div>

          <div id="tableBody">
            {members.map((value, index) => (
              <MemberItem
                key={index}
                value={value}
                selecteFunct={toggleMemberSelection}
                refreshApi = {handleGetAllMember}
              ></MemberItem>
            ))}
          </div>
        </div>

        <Pagination
          paramID={params.listID}
          countNumberOfPage={countListPage}
          pages={pages}
          increaseIndex={increaseIndex}
          sliceSetData={setMembers}
          data={allMemberData}
          route={"/members/list/"}
        ></Pagination>
      </div>
    </div>
  );
}

export default MemberList;
