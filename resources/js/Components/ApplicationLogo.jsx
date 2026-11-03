export default function ApplicationLogo(props) {
    return (
        <img 
            {...props} 
            src="/images/logo-melawi.jpeg" 
            alt="Logo Kabupaten Melawi" 
            className={`object-contain ${props.className || ''}`}
        />
    );
}