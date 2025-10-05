import { InformationItem } from "./components/InformationItem";
import {
  FaMapMarkedAlt,
  FaCity,
  FaMap,
  FaMailBulk,
  FaRegFlag,
} from "react-icons/fa";
import { userProfile } from "./components/Item";
import { BiSolidUser, BiMaleFemale } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import { ImPhone } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export const AddressInfo = () => {
  const userAddress = userProfile.addresses;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Address Information</h1>
      {userAddress.map((addr) => {
        return (
          <>
            <h2 className="text-lg font-semibold">{addr.label}</h2>
            <div className="flex flex-col gap-3">
              <InformationItem
                icon={FaMapMarkedAlt}
                title="Street Address"
                description={addr.street}
                iconWrapperClassName="bg-gradient-to-br from-green-500/10 to-green-500/30 text-green-500"
              />
              <InformationItem
                icon={FaCity}
                title="City"
                description={addr.city}
                iconWrapperClassName="bg-gradient-to-br from-orange-500/10 to-orange-500/30 text-orange-500"
              />
              <InformationItem
                icon={FaMap}
                title="State"
                description={addr.state}
                iconWrapperClassName="bg-gradient-to-br from-blue-500/10 to-blue-500/30 text-blue-500"
              />
              <InformationItem
                icon={FaMailBulk}
                title="Postal Code"
                description={addr.postalCode}
                iconWrapperClassName="bg-gradient-to-br from-purple-500/10 to-purple-500/30 text-purple-500"
              />
              <InformationItem
                icon={FaRegFlag}
                title="Country"
                description={addr.country}
                iconWrapperClassName="bg-gradient-to-br from-red-500/10 to-red-500/30 text-red-500"
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export const ProfileInfo = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-center lg:text-start md:text-start">
        Profile Information
      </h1>
      <div className="flex flex-col gap-3">
        <InformationItem
          icon={BiSolidUser}
          iconWrapperClassName="bg-gradient-to-br from-blue-500/30 to-blue-500/10 text-blue-500"
          title="Full Name"
          username={userProfile.username}
          description={userProfile.fullName}
        />
        <InformationItem
          icon={TbMailFilled}
          iconWrapperClassName="bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 text-emerald-500"
          title="Email Address"
          description={userProfile.email}
        />
        <InformationItem
          icon={ImPhone}
          iconWrapperClassName="bg-gradient-to-br from-purple-500/30 to-purple-500/10 text-purple-500"
          title="Phone Number"
          description={userProfile.phoneNumber}
        />
        <InformationItem
          icon={LiaBirthdayCakeSolid}
          iconWrapperClassName="bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 text-yellow-500"
          title="Birthday"
          description={userProfile.birthday}
        />
        <InformationItem
          icon={BiMaleFemale}
          iconWrapperClassName="bg-gradient-to-br from-red-500/30 to-red-500/10 text-red-500"
          title="Gender"
          description={userProfile.gender}
        />
      </div>
    </div>
  );
};
