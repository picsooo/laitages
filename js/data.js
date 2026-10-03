/* Données produits — noms, familles et visuels repris du site laitagesdumaghreb.dz */
(function(){
  var R = 'https://laitagesdumaghreb.dz/wp-content/uploads/';
  var base = (document.documentElement.getAttribute('data-base') || '');
  function L(f){ return base + 'img/p/' + f + '.webp'; }
  window.LDM_PRODUCTS = [
    {id:'creme-cheese', name:'Crème Cheese', format:'Barquette 120 g', cat:'Crème cheese', brand:'Matino', img:L('creme-cheese'), use:['Petit-déjeuner','Tartines','Pâtisserie']},
    {id:'creme-edam', name:"Crème d'Edam", format:'Barquette 125 g', cat:'À tartiner', brand:'Matino', img:L('creme-edam'), use:['Tartines','Sandwichs','Goûter']},
    {id:'creme-gouda', name:'Crème de Gouda', format:'Barquette 125 g', cat:'À tartiner', brand:'Matino', img:L('creme-gouda'), use:['Tartines','Sandwichs','Goûter']},
    {id:'creme-gruyere', name:'Crème de Gruyère', format:'Barquette 125 g', cat:'À tartiner', brand:'Matino', img:L('creme-gruyere'), use:['Tartines','Gratins','Goûter']},
    {id:'camembert-barquette', name:'Crème de Camembert', format:'Barquette', cat:'Camembert', brand:'Matino', img:L('camembert'), use:['Tartines','Plateau','Quiches']},
    {id:'barre-edam', name:'Barre Edam', format:'Barre', cat:'Edam', brand:'Matino', img:L('barre-edam'), use:['Sandwichs','Pizza','Gratins']},
    {id:'barre-gouda', name:'Barre Gouda', format:'Barre', cat:'Gouda', brand:'Matino', img:L('barre-gouda'), use:['Sandwichs','Burgers','Gratins']},
    {id:'barre-cheddar', name:'Barre Cheddar', format:'Barre', cat:'Cheddar', brand:'Matino', img:L('barre-cheddar'), use:['Burgers','Sandwichs','Sauces']},
    {id:'barre-maasdam', name:'Barre Maasdam', format:'Barre', cat:'Maasdam', brand:'Matino', img:L('barre-maasdam'), use:['Sandwichs','Pâtes','Pizza','Salades']},
    {id:'gouda-pm', name:'Barre Gouda PM', format:'Petit modèle', cat:'Gouda', brand:'Matino', img:L('gouda-pm'), use:['Sandwichs','Goûter']},
    {id:'cheddar-pm', name:'Barre Cheddar PM', format:'Petit modèle', cat:'Cheddar', brand:'Matino', img:L('cheddar-pm'), use:['Burgers','Sandwichs']},
    {id:'maasdam-pm', name:'Barre Maasdam PM', format:'Petit modèle', cat:'Maasdam', brand:'Matino', img:L('maasdam-pm'), use:['Sandwichs','Salades']},
    {id:'barres-pack', name:'Barres Edam, Maasdam, Gouda, Cheddar', format:'Gamme « La perle du »', cat:'Spécial Culinaire', brand:'Matino', img:L('barres-pack'), use:['Cuisine','Restauration']},
    {id:'rape', name:'Fromage râpé', format:'Sachet', cat:'Râpé', brand:'Matino', img:R+'2020/08/0013_Fromage-Rape-450x450.jpg', remote:true, use:['Gratins','Pâtes','Pizza']},
    {id:'rape-3', name:'Râpé 3 saveurs Cheddar, Maasdam, Mozzarella', format:'Sachet', cat:'Râpé', brand:'Matino', img:R+'2020/08/0012_Fromage-rape-3-saveurs-CHEDDAR-MAASDAM-MOZZARELLA-450x450.jpg', remote:true, use:['Pizza','Gratins','Quiches']},
    {id:'rape-maasdam', name:'Fromage râpé Maasdam', format:'Sachet', cat:'Râpé', brand:'Matino', img:R+'2020/08/0014_Fromage-rape-MAASDAM-450x450.jpg', remote:true, use:['Pâtes','Gratins']},
    {id:'mozzarella', name:'Mozzarella', format:'Bloc', cat:'Mozzarella', brand:'Matino', img:R+'2020/08/0010_MOZZARELLA-450x450.jpg', remote:true, use:['Pizza','Gratins']},
    {id:'edam-boule', name:'Edam en boule', format:'Boule', cat:'Edam', brand:'Matino', img:R+'2020/08/0015_Fromage-EDAM-en-Boule-450x450.jpg', remote:true, use:['Plateau','Sandwichs']},
    {id:'edam-demi-lune', name:'Edam demi-lune', format:'Demi-lune', cat:'Edam', brand:'Matino', img:R+'2020/08/0016_Fromage-EDAM-demi-lune-450x450.jpg', remote:true, use:['Plateau','Sandwichs']},
    {id:'steak', name:'Fromage en steak', format:'Edam, Maasdam, Gouda, Cheddar', cat:'Spécial Pizza – Gratin – Quiche', brand:'Matino', img:R+'2020/08/0019_Fromage-en-Steak-EDAM-MAASDAM-GOUDA-CHEDDAR-450x450.jpg', remote:true, use:['Burgers','Restauration']},
    {id:'camembert', name:'Camembert', format:'Boîte', cat:'Camembert', brand:'Matino', img:R+'2020/08/0004_Camembert-450x450.jpg', remote:true, use:['Plateau','Quiches']},
    {id:'portion-carre', name:'Préparation fromagère en portion carrée', format:'Spécialité culinaire', cat:'Spécial Culinaire', brand:'Matino', img:R+'2020/08/0007_Preparation-Fromagere-en-Portion-Carre-Specialite-Culinaire-450x450.jpg', remote:true, use:['Cuisine','Restauration']},
    {id:'lait-ecreme', name:'Poudre de lait écrémé', format:'Boîte', cat:'Poudre de lait', brand:'Matino', img:L('lait-ecreme'), use:['Pâtisserie','Petit-déjeuner']},
    {id:'lait-entier', name:'Poudre de lait entier', format:'Boîte', cat:'Poudre de lait', brand:'Matino', img:R+'2020/08/boite-poudre-de-lait-entier-450x450.jpg', remote:true, use:['Pâtisserie','Petit-déjeuner','Gâteaux']},
    {id:'mayo-bocal', name:'Sauce mayonnaise', format:'Bocal', cat:'Sauce Mayonnaise', brand:'Matino Joy', img:L('mayo'), use:['Salades','Sandwichs']},
    {id:'mayo-gm', name:'Sauce mayonnaise GM', format:'Grand modèle', cat:'Sauce Mayonnaise', brand:'Matino Joy', img:R+'2020/08/Sauce-mayonnaise-GM-450x450.jpg', remote:true, use:['Restauration','Sandwichs']},
    {id:'boite-chef', name:'Boîte Chef', format:'À tartiner', cat:'À tartiner', brand:'Matino Joy', img:L('boite-chef'), use:['Famille','Tartes','Gratins']},
    {id:'creme-epaisse', name:'Crème épaisse à cuisiner', format:'Pot', cat:'Spécial Culinaire', brand:'Matino', img:R+'2020/08/0002_Creme-Epaisse-a-Cuisiner-450x450.jpg', remote:true, use:['Sauces','Gratins','Pâtes']},
    {id:'margarine', name:'Margarine 500 g', format:'500 g', cat:'Spécial Culinaire', brand:'Laitages du Maghreb', img:R+'2020/08/Margarine-500gr-450x450.jpg', remote:true, use:['Pâtisserie','Cuisine']},
    {id:'smen', name:'Smen végétale', format:'Pot', cat:'Spécial Culinaire', brand:'Laitages du Maghreb', img:R+'2020/08/0000_Smen-Vegetale-450x450.jpg', remote:true, use:['Cuisine traditionnelle','Pâtisserie']}
  ];
  window.LDM_FAMILIES = ['À tartiner','Camembert','Cheddar','Crème cheese','Edam','Gouda','Maasdam','Mozzarella','Poudre de lait','Râpé','Sauce Mayonnaise','Spécial Culinaire','Spécial Pizza – Gratin – Quiche','Squize'];
  window.LDM_WILAYAS = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M\'Sila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet','El M\'Ghair','El Meniaa'];
})();
