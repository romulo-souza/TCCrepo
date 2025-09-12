import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class GridLotties extends StatelessWidget {
  final List<String> animations;

  const GridLotties({super.key, required this.animations});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      physics: const NeverScrollableScrollPhysics(), // sem scroll
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3, // 3 colunas
        childAspectRatio: 1, // quadrado
      ),
      itemCount: animations.length,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.all(4),
          child: Lottie.asset(
            animations[index],
            repeat: true,
            animate: true,
            fit: BoxFit.contain,
          ),
        );
      },
    );
  }
}
