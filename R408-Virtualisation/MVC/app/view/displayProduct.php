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
<?php
    if ($product==null) {
        echo "<p> not found </p>";
    }
    else { ?>
<table>
    <thead>
    <tr>
        <th> id </th>
        <th> name </th>
        <th> price </th>
        <th> quantity </th>
    </tr>
    </thead>
    <tbody>

    <tr>
        <td> <?= $product->getId() ?> </td>
        <td> <?= $product->getName() ?> </td>
        <td> <?= $product->getPrice() ?> </td>
        <td> <?= $product->getQuantity() ?> </td>
    </tr>

    </tbody>
</table>
   <?php } ?>


</body>
</html>
