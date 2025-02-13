import Link from "next/link";
import { fab, IconLookup, IconName } from "@fortawesome/free-brands-svg-icons";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import "@fortawesome/fontawesome-svg-core/styles.css";

type Profile = Tables<"profiles">;

const ProfileWithFaIcon = z.object({
  icon: z
    .object({
      "fa-brands": z.string().transform((x) => x as IconName),
    })
    .partial(),
});

function getProfileFaIconLookup(profile: Profile): IconLookup | undefined {
  const { data: { icon } = {} } = ProfileWithFaIcon.safeParse(profile);
  if (icon?.["fa-brands"] != null)
    return {
      prefix: "fab",
      iconName: icon["fa-brands"],
    };
}

interface ProfileIconProps {
  profile: Profile;
}

function ProfileIcon({ profile }: ProfileIconProps) {
  const iconLookup = getProfileFaIconLookup(profile);
  if (iconLookup?.prefix === "fab") {
    const icon = Object.values(fab).find(
      (fa) => fa.iconName === iconLookup.iconName,
    );
    return icon && <FontAwesomeIcon icon={icon} fixedWidth />;
  }
}

async function getProfiles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("enabled", true)
    .order("name");
  return data || [];
}

export default async function Header() {
  const profiles = await getProfiles();

  return (
    <div className="fixed w-full">
      <header className="container mx-auto flex h-16 items-center px-4">
        <div className="ms-auto flex">
          {...profiles.map((profile) => (
            <Link
              href={profile.url}
              title={profile.description || undefined}
              className="p-2"
              key={profile.name}
            >
              <ProfileIcon profile={profile} />
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
}
