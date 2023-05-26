import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes: ["/home", "/explore"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
