import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {
 i18n
};

export default withFlowbiteReact(nextConfig);