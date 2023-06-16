import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandTwitter,
} from "@tabler/icons-react";
import {
    IconBrandYoutube,
    IconCar,
    IconDevices,
    IconDiscount2,
    IconRotateRectangle,
} from "@tabler/icons-react";

export type WhyChooseUs = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

export let whyChooseUs: WhyChooseUs[] = [
    {
        title: "Variety of car brands",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.",
        icon: <IconCar size={96} aria-label="Car" />,
    },
    {
        title: "Resonable Rates",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.",
        icon: <IconDiscount2 size={96} aria-label="Price" />,
    },
    {
        title: "Easy Online Booking",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.",
        icon: <IconDevices size={96} aria-label="Devices" />,
    },
    {
        title: "Quick & Easy Pickup & Return",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.",
        icon: <IconRotateRectangle size={96} aria-label="Rotate rectangle" />,
    },
];

export let cities: string[] = [
    "CityPlaceholder",
    "CityPlaceholder",
    "CityPlaceholder",
    "CityPlaceholder",
    "CityPlaceholder",
];

export let expolore: string[] = [
    "ExplorePlaceholder",
    "ExplorePlaceholder",
    "ExplorePlaceholder",
    "ExplorePlaceholder",
    "ExplorePlaceholder",
];

export let intercity: string[] = [
    "CityName - CityName2",
    "CityName2 - CityName3",
    "CityName3 - CityName1",
    "CityName1 - CityName4",
    "CityName4 - CityName2",
];

export let terms: string[] = [
    "Terms",
    "Privacy Policy",
    "Legal notice",
    "Accessibility",
];

export let socials = [
    { key: 1, icon: <IconBrandYoutube size={24} aria-label="youtube" /> },
    { key: 2, icon: <IconBrandFacebook size={24} aria-label="facebook" /> },
    { key: 3, icon: <IconBrandTwitter size={24} aria-label="twitter" /> },
    { key: 4, icon: <IconBrandInstagram size={24} aria-label="instagram" /> },
    { key: 5, icon: <IconBrandLinkedin size={24} aria-label="linkedin" /> },
];
