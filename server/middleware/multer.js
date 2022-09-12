//--Package qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

//--Dictionnaire ou dossier statique) des extensions de fichier
    const MIME_TYPES = {
//--Voici les trois différents MIME_TYPES que l'on peut avoir depuis le frontend
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
        'image/tiff': 'tiff',
        'image/bmp': 'bmp',
        'image/vnd.microsoft.icon': 'ico',
        'image/vnd.wap.wbmp': 'wbmp',
        'image/x-icon': 'ico',
        'image/x-jng': 'jng',
        'image/x-ms-bmp': 'bmp',
        'image/x-png': 'png',
        'image/x-xbitmap': 'xbm',
        'video/mp4': 'mp4',
        'video/ogg': 'ogg',
        'video/webm': 'webm',
        'video/x-matroska': 'mkv',
        'video/x-ms-asf': 'asf',
        'video/x-ms-wmv': 'wmv',
        'video/x-msvideo': 'avi',
        'video/x-flv': 'flv',
        'video/x-m4v': 'm4v',
        'video/quicktime': 'mov',
        

    };

//--Objet de configuration pour multer
const storage = multer.diskStorage({//--La fonction diskstorage de multer a besoin de deux éléments
    destination: (reg, file, callback) => {
        callback(null, 'images')//--null permet de signaler qu'il n'y a pas eu d'erreur a ce niveau là
    },
    filename: (req, file, callback) => {
//--construction du nouveau nom pour le fichier. originalname est une propriété de file
        const name = file.originalname.split(' ').join('_')//-- split(' ').join('_') permet de remplacer les espaces du nom de fichier par des underscores
//--Ajout d'une extension au fichier.
//--Malheureusement, on a pas acccés à cette extension avec le fichier envoyé mais on a accès à son MIME_TYPES (image/jpeg ou image/png...)
//--On utilise ces MIME_TYPES pour générer l'extension du fichier à partir de celle envoyé par le frontend pour qu'elle soit identique
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //--Date.now est le timestamp (Horodatage = mécanisme qui consiste à associer une date et une heure à un événement)du fichier
    }
 });

 module.exports = multer({ storage }).single('image');//--single permet de dire à multer qu'il s'agit d'un fichier unique