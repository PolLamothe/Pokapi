<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Mon magasin</title>
</head>
<body>
<nav>
    <ul>
        <li> <a href="<?=CFG['siteURL'].'Home'?>"> Home </a> </li>
    </ul>
</nav>
<form action="<?=CFG['siteURL'].'Product/updateProduct'?>" method="post">
    <input type="text" name="id" placeholder="id" value="<?= $product->getId()?>">
    <input type="text" name="name" placeholder="name" value="<?= $product->getName()?>">
    <input type="text" name="price" placeholder="price" value="<?= $product->getPrice()?>">
    <input type="text" name="quantity" placeholder="quantity" value="<?= $product->getQuantity()?>">
    <input type="hidden" name="idS" value="<?= $product->getId()?>">
    <input type="submit">
</form>


</body>
</html>
