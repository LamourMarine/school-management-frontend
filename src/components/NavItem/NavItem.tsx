import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItemProps = {
    label: string;
    path: string;
};

function NavItem({ label, path}: NavItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <Button
        color="inherit"
        onClick={() => navigate(path)}
        sx={{
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
        }}
        >
        {label}
        </Button>
    );
}

export default NavItem;