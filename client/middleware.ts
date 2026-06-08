import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getArticleBySlug } from "./lib/data/articles";
import { getAllCategoriesQuery } from "./lib/data/categories";
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  try {
    if (pathname.startsWith("/articles/")) {
      const articleSlug = pathname.replace("/articles/", "");

      if (!articleSlug) return NextResponse.next();

      const { article } = await getArticleBySlug(articleSlug);
      if (article && article.categories && article.categories.length > 0) {
        const category = article.categories[0];

        return NextResponse.redirect(
          new URL(`/${category.slug}/${articleSlug}`, request.url),
          301,
        );
      }
    }
    if (pathname.startsWith("/categories/")) {
      const categorySlug = pathname.replace("/categories/", "");

      if (!categorySlug) return NextResponse.next();

      const { categories } = await getAllCategoriesQuery();

      const categoryExists = categories?.some(
        (category) => category.slug === categorySlug,
      );

      if (categoryExists) {
        return NextResponse.redirect(
          new URL(`/${categorySlug}`, request.url),
          301,
        );
      }
    }
  } catch (error) {
    console.error("Błąd GraphQL w Middleware:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*", "/categories/:path*"],
};
