function StatusBadge({
    status,
}) {

    const styles = {
        pending:
            "bg-yellow-500/10 text-yellow-400",

        accepted:
            "bg-green-500/10 text-green-400",

        rejected:
            "bg-red-500/10 text-red-400",
    };

    return (
        <span
            className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${styles[status]}
            `}
        >
            {status}
        </span>
    );
}

export default StatusBadge;