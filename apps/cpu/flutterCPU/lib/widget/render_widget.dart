import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

class RenderWidget extends StatefulWidget {
  final List<String> images;
  final String resolution;

  const RenderWidget({
    super.key,
    required this.images,
    required this.resolution,
  });

  @override
  RenderWidgetState createState() => RenderWidgetState();
}

class RenderWidgetState extends State<RenderWidget> {
  final Random _random = Random();
  int imageIndex = 0;
  late List<int> iconIndexes;

  final List<IconData> iconOptions = [
    Icons.camera,
    Icons.star,
    Icons.favorite,
    Icons.home,
    Icons.settings,
    Icons.email,
    Icons.delete,
  ];

  Timer? _timer;

  @override
  void initState() {
    super.initState();
    // Começa com índice aleatório
    imageIndex = _random.nextInt(widget.images.length);
    iconIndexes = List.generate(3, (_) => _random.nextInt(iconOptions.length));

    // Troca a imagem e os ícones a cada 800ms
    _timer = Timer.periodic(const Duration(milliseconds: 800), (_) {
      setState(() {
        // avança uma posição de forma circular
        imageIndex = (imageIndex + 1) % widget.images.length;

        // troca ícones de forma aleatória
        iconIndexes = List.generate(
          3,
          (_) => _random.nextInt(iconOptions.length),
        );
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFF22222F),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            widget.resolution,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 5),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.asset(
              widget.images[imageIndex],
              width: 155,
              height: 170,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 5),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children:
                iconIndexes
                    .map(
                      (idx) => Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 5),
                        child: Icon(
                          iconOptions[idx],
                          color: const Color(0xFF47aa33),
                        ),
                      ),
                    )
                    .toList(),
          ),
        ],
      ),
    );
  }
}
