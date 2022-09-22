import React from "react";
import Card from "react-bootstrap/Card";
import "./Rules.css";
function Rules() {
  return (
    <div>
      <h1 className="rules-title">
        {" "}
        ⛔️ Lorsque vous utilisez Groupomania, il est interdit de :
      </h1>
      <Card className="body-rules">
        <Card.Body>
          Masquer votre identité, usurper l’identité d’une autre personne ou
          présenter de manière inexacte votre affiliation avec toute personne ou
          toute entité ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Vous engager dans toute activité qui exploite, fait du tort ou menace
          de faire du tort à des enfants ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Créer ou afficher du contenu illégal, discriminatoire, dangereux,
          frauduleux, trompeur ou diffamatoire, ou qui favorise ou encourage la
          violence, la violation des lois, l’automutilation, les troubles de
          l’alimentation ou l’abus de stupéfiants ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Violer la loi ou enfreindre les droits de Groupomania ou de tout autre
          tiers ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Interférer avec le bon fonctionnement de Groupomania ou avec
          l’utilisation de Groupomania par une autre personne ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          Accéder à Groupomania ou à du contenu ou des informations relatives à
          Groupomania par des moyens non autorisés par Groupomania (notamment
          par collecte ou par analyse) ; contourner les contrôles d’accès ; ou
          tenter d’obtenir un accès non autorisé à Groupomania ou aux systèmes,
          aux mots de passe et aux comptes qui y sont associés de quelque
          manière que ce soit ;
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Partager des tokens d’accès administrateur avec un tiers qui n’a pas
          été expressément approuvé par Groupomania ou lui accorder un accès
          similaire à l’application. Lorsque vous décidez d’accorder un tel
          droit d’accès administrateur, par le biais d’un token ou d’une
          autorisation associée à l’application, à un tiers approuvé, vous
          pouvez autoriser ce tiers à accéder à vos données ou vos contenus,
          uniquement dans la mesure requise aux fins approuvées par Groupomania
          et en accord avec vos instructions. Nous nous réservons le droit de
          limiter l’accès accordé aux tiers (p. ex., en réinitialisant le token
          d’accès ou en supprimant l’autorisation d’accès à l’application) à
          tout moment si nous jugeons que ce droit d’accès a été ou sera utilisé
          à mauvais escient.
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Importer des virus, des programmes ou des codes malveillants, ou faire
          quoi que ce soit qui pourrait endommager, désactiver, surcharger ou
          détériorer Groupomania et les systèmes associés (comme une attaque
          entraînant un refus de service ou une interférence avec l’affichage
          des pages ou toute autre fonctionnalité de Groupomania).
        </Card.Body>
      </Card>
      <Card className="body-rules">
        <Card.Body>
          {" "}
          Notez également que Groupomania ne peut pas être utilisé par des
          mineurs de moins de 13 ans. Si vous avez moins de 13 ans, vous n’êtes
          pas autorisé(e) à accéder au service ni à l’utiliser.
        </Card.Body>
      </Card>
    </div>
  );
}

export default Rules;
