import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export default authMiddleware({
    afterAuth(auth, req, evt) {
        if (!auth.userId && !auth.isPublicRoute) {
            const explore = new URL('/explore', req.url)
            return NextResponse.redirect(explore)
        }
    },
    publicRoutes: ["/explore"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
