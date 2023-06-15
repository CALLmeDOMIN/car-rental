"use client";

import { IconBuildingSkyscraper, IconHotelService } from "@tabler/icons-react";
import { IconMapPins, IconPlaneDeparture } from "@tabler/icons-react";
import Dropdown from "./dropdown";

export default function DropMW({ label }: { label: string }) {
    const locations = [
        {
            name: "Address",
            isSelected: true,
            icon: <IconMapPins size="18" aria-label="map" />,
        },
        {
            name: "Airport",
            isSelected: false,
            icon: <IconPlaneDeparture size="18" aria-label="plane" />,
        },
        {
            name: "City",
            isSelected: false,
            icon: <IconBuildingSkyscraper size="18" aria-label="building" />,
        },
        {
            name: "Hotel",
            isSelected: false,
            icon: <IconHotelService size="18" aria-label="hotel" />,
        },
    ];

    return <Dropdown locations={locations} label={label} />;
}
