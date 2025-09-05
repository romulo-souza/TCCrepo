import 'package:flutter/material.dart';

class RenderWidget extends StatelessWidget {
  final List<String> images;
  final String resolution;
  final int imageIndex; // índice fixo da imagem

  const RenderWidget({
    super.key,
    required this.images,
    required this.resolution,
    required this.imageIndex,
  });

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
            resolution,
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
              images[imageIndex],
              width: 155,
              height: 170,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 5),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.camera, color: Color(0xFF47aa33)),
              SizedBox(width: 10),
              Icon(Icons.star, color: Color(0xFF47aa33)),
              SizedBox(width: 10),
              Icon(Icons.favorite, color: Color(0xFF47aa33)),
            ],
          ),
        ],
      ),
    );
  }
}
