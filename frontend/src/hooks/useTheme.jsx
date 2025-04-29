import { useColorMode } from "@chakra-ui/react";

export function useTheme() {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const themeCss = {
        backgroundColor: isDark ? '#1a202c' : '#f9f9f9',
        color: isDark ? '#f9f9f9' : '#1a202c'
    };

    return {isDark, themeCss};
}