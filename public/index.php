<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p id="all"></p>
    <input type="date" name="fecha" id="fecha">
</body>
<script src="moment.min.js"></script>
<script>
    let current = moment();
    let custom = moment('09:00', 'hh:mm');

    console.log( current.isAfter(custom) );
</script>
</html>