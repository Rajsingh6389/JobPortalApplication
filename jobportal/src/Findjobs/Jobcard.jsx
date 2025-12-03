import { Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconClockHour3, IconMapPin } from "@tabler/icons-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Jobcard({ data }) {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const navigate = useNavigate();

  const handleApply = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/find-jobs/${data.id}`);
  };

  return (
    <div
      className="
      bg-mine-shaft-800 p-4 sm:p-5 mt-4
      rounded-xl border border-mine-shaft-700/40
      w-full max-w-[350px] sm:max-w-[380px] 
      transition-all duration-300
      hover:scale-[1.03] hover:-translate-y-2
      hover:shadow-lg hover:shadow-bright-sun-400/20
      hover:border-bright-sun-300/40
      cursor-pointer
      flex flex-col justify-between
    "
    >
      {/* -- TOP SECTION -- */}
      <div className="flex justify-between items-start gap-2">
        
        {/* Logo + Title */}
        <div className="flex gap-3 items-center flex-1">
          <div className="p-2 bg-mine-shaft-900 rounded-md min-w-[44px] min-h-[44px] flex justify-center items-center">
            <img
              className="h-7 object-contain"
              src={`/Icons/${data.company}.png`}
              alt={data.company}
              onError={(e) => (e.target.src = "/Icons/default.png")} // fallback
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-mine-shaft-100 leading-tight text-sm sm:text-base">
              {data.jobTitle}
            </h3>
            <p className="text-xs sm:text-sm text-mine-shaft-400 mt-1">
              {data.company} • {data.applicants} Applicants
            </p>
          </div>
        </div>

        <IconBookmark className="text-mine-shaft-300 hover:text-bright-sun-300 transition" />
      </div>

      {/* -- TAGS -- */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Tag>{data.experience}</Tag>
        <Tag>{data.jobType}</Tag>
        <Tag>
          <IconMapPin size={14} />
          {data.location}
        </Tag>
      </div>

      {/* -- DESCRIPTION -- */}
      <Text
        className="text-xs text-mine-shaft-300 mt-3 text-justify"
        lineClamp={3}
      >
        {data.description}
      </Text>

      <Divider className="my-4" size="xs" color="mine-shaft.7" />

      {/* -- BOTTOM ROW -- */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-sm">

        {/* Salary */}
        <div className="text-mine-shaft-200 font-semibold">
          ₹{data.packageAmount}
        </div>

        {/* Apply Button */}
        <Button
          size="xs"
          className="bg-bright-sun-300 text-black font-semibold hover:bg-bright-sun-200"
          onClick={handleApply}
        >
          Apply
        </Button>

        {/* Posted Days */}
        <div className="flex items-center gap-1 text-mine-shaft-400 text-xs">
          <IconClockHour3 size={16} />
          {data.postedDaysAgo}d
        </div>

      </div>
    </div>
  );
}

const Tag = ({ children }) => (
  <div
    className="
    px-3 py-1 bg-mine-shaft-900 border border-mine-shaft-700
    rounded-lg text-bright-sun-400 text-[11px] sm:text-xs
    flex items-center gap-1
    "
  >
    {children}
  </div>
);

export default Jobcard;
