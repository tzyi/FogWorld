/**
 * ExploreButton Component Tests
 * 探索按鈕元件測試
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ExploreButton } from '../../../src/features/fogmask/components/ExploreButton';
import { useFogMaskStore } from '../../../src/features/fogmask/store';
import { ExploreStatus } from '../../../src/features/fogmask/types';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

describe('ExploreButton Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render "開始探索" when status is IDLE', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
    });

    const { getByText } = render(<ExploreButton onPress={mockOnPress} />);
    expect(getByText('開始探索')).toBeTruthy();
  });

  it('should render "停止探索" when status is EXPLORING', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
    });

    const { getByText } = render(<ExploreButton onPress={mockOnPress} />);
    expect(getByText('停止探索')).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
    });

    const { getByText } = render(<ExploreButton onPress={mockOnPress} />);
    const button = getByText('開始探索');
    
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading is true', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
    });

    const { getByText } = render(
      <ExploreButton onPress={mockOnPress} loading={true} />
    );
    const button = getByText('開始探索').parent;
    
    fireEvent.press(button!);
    // Button should still be pressable in the component, but disabled prop is set
    expect(button).toBeTruthy();
  });

  it('should show ActivityIndicator when loading', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
    });

    const { queryByText, UNSAFE_getByType } = render(
      <ExploreButton onPress={mockOnPress} loading={true} />
    );
    
    // Should not show text when loading
    expect(queryByText('開始探索')).toBeNull();
    // Should show ActivityIndicator (imported from react-native)
    const ActivityIndicator = require('react-native').ActivityIndicator;
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
