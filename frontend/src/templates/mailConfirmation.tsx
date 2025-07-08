import React from "react";

type MailConfirmationProps = {
    username: string;
    password: string;
    accountLink: string;
    cgvLink: string
};

export default function MailConfirmation({ username, password, accountLink, cgvLink }: MailConfirmationProps) {
    return (
        <div style={{
            maxWidth: 480,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 12,
            fontFamily: "Arial, sans-serif",
            color: "#222",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
        }}>
            <div style={{background: "#f8f2f1", padding: "2rem" }}>
                <p style={{fontSize: "2rem", textAlign: "center"}}>Hello,</p>
                <p>Merci d'avoir créé un compte sur Audelweiss.</p>
                <p>Ton nom d'utilisateur est : <b>{username}</b>.</p>
                <p>Ton mot de passe est : <b>{password}</b>.</p>
                <p>Tu peux accéder à ton espace compte pour consulter tes commandes,
                    modifier ton mot de passe et plus encore à l'adresse suivante :</p>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                <a
                    href={accountLink}
                    style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        background: "#ff6187",
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: "bold"
                    }}
                >
                    Accéder à mon compte
                </a>
                </div>
            </div>
            <div style={{ borderTop: "1px solid #eee", padding: "2rem", textAlign: "center", background: "#2d1c1c", color: "#fff" }}>
                <p>Suis les actus sur Instagram !</p>
                <a
                    href="https://instagram.com/audelweisscraft"
                    style={{
                        color: "#e1306c",
                        fontWeight: "bold",
                        textDecoration: "none"
                    }}
                >
                    instagram
                </a>
                <p style={{ marginTop: 16 }}>
                    En cas de questions, n'hésitez pas à me contacter : <a href="mailto:support@audelweiss.fr">support@audelweiss.com</a>
                </p>
                <p>
                    <a href={cgvLink} style={{ color: "#fff", textDecoration: "none" }}>
                        Politique de confidentialité
                    </a>
                </p>
            </div>
        </div>
    );
}