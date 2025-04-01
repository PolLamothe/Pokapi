<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Mon magasin</title>
</head>
<body>
<nav>
    <ul>
        <li> <a href="<?=CFG['siteURL'].'User/login'?>"> Login </a></li>
        <li> <a href="<?=CFG['siteURL'].'User/logout'?>">  Logout </a></li>
    </ul>
</nav>
<nav>
    <ul>
        <li> <a href="<?=CFG['siteURL'].'Product/add'?>"> Add product </a> </li>
    </ul>
</nav>
<table>
    <thead>
        <tr>
            <th> id </th>
            <th> name </th>
            <th> price </th>
            <th> quantity </th>
            <th> update </th>
            <th> delete </th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($data as $product):?>
       <tr>
        <td> <?= $product->getId() ?> </td>
        <td> <?= $product->getName() ?> </td>
        <td> <?= $product->getPrice() ?> </td>
        <td> <?= $product->getQuantity() ?> </td>
        <td> <a href="<?=CFG['siteURL'].'Product/update/'.$product->getId() ?>"> update </a></td>
           <td> <a href="<?=CFG['siteURL'].'Product/delete/'.$product->getId() ?>"> delete </a></td>
       </tr>
    <?php endforeach;?>
    </tbody>
</table>
</body>
</html>
