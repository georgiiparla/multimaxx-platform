import { Group } from "@mantine/core";
import Image from "next/image";
import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";

export const Header = () => (
  <Group className="flex items-center justify-between h-full px-md">
    <Image
      className="dark:invert"
      src="https://multimaxx-assets.fra1.cdn.digitaloceanspaces.com/short-mmx-icon.png"
      alt="logo"
      width={38}
      height={38}
    />
    <ColorSchemesSwitcher />
  </Group>
);
