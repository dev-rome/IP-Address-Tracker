"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import MarkerContainer from "@/components/MarkerContainer";
import { MapContainer, TileLayer } from "react-leaflet";

export default function page() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress`,
        );
        const data = await res.json();
        setData(data);
      };

      getInitialData();
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    }
  }, []);

  const fetchSearchData = async () => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress=${searchInput}&domain=${searchInput}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const results = await res.json();
      setData(results);
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    }
  };

  const position = [data?.location.lat, data?.location.lng];

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchData();
    setSearchInput("");
  };

  return (
    <section className="flex h-screen flex-col">
      <div className="flex h-[300px] flex-col items-center bg-bg_mobile bg-cover bg-no-repeat px-6 pt-7 md:h-[280px] md:bg-bg_desktop">
        <h1 className="mb-8 text-center text-2xl text-white md:text-3xl">
          IP Address Tracker
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex w-full max-w-[500px] items-center md:mb-12"
        >
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="h-[58px] w-full rounded-l-2xl p-5 outline-none"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="h-[58px] rounded-r-2xl bg-black p-5 hover:bg-dark-gray"
          >
            <Image
              src="/images/icon-arrow.svg"
              alt="arrow"
              width={8}
              height={12}
            />
          </button>
        </form>

        {data && (
          <div className="relative z-20 mx-auto flex flex-col items-center justify-evenly gap-6 rounded-2xl bg-white px-6 py-7 text-center md:w-full md:max-w-[1110px] md:py-9 lg:flex-row lg:gap-0 lg:text-left">
            <div className="flex w-full flex-col gap-2 px-3 lg:gap-3 lg:border-r">
              <p className="text-[10px] font-bold text-gray lg:text-xs">
                IP Address
              </p>
              <p className="text-md font-medium text-dark-gray lg:text-base">
                {data.ip}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 px-3 lg:gap-3 lg:border-r">
              <p className="text-[10px] font-bold text-gray lg:text-xs">
                Location
              </p>
              <p className="text-md font-medium text-dark-gray lg:text-base">
                {data.location.city}, {data.location.region}{" "}
                {data.location.postalCode}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 px-3 lg:gap-3 lg:border-r">
              <p className="text-[10px] font-bold text-gray lg:text-xs">
                Timezone
              </p>
              <p className="text-md font-medium text-dark-gray lg:text-base">
                UTC {data.location.timezone}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 lg:gap-3 lg:pl-3">
              <p className="text-[10px] font-bold text-gray lg:text-xs">ISP</p>
              <p className="text-md font-medium text-dark-gray lg:text-base">
                {data.isp}
              </p>
            </div>
          </div>
        )}
      </div>

      {data && (
        <div className=" z-10 flex flex-grow items-center justify-center">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerContainer data={data} />
          </MapContainer>
        </div>
      )}
    </section>
  );
}
