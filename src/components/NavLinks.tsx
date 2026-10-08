import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
const NavLinks = async () => {
  let navs: Navs[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    if (res.ok) {
     const data: Navs[] = await res.json();
      navs = Array.isArray(data) ? data : [];
    }
  } catch {
    navs = [];
  }

  return (
    <nav className="flex items-center justify-center gap-6">
      {navs.map((nav) => (
        <Link
          key={nav.id}
          href={`/category/${nav.slug}`}
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-700"
        >
          {nav.icon && <span>{nav.icon}</span>}
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;