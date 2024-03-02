import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '../contexts/themeContext';
import Theme from '../types/theme';
import { Post } from '../types/posts';
import { BASE_URL } from '../../utils/network';
import TrackPlayer, { Track, TrackType } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props {
    post: Post
    onClick?: (post: Post) => void 
}


const playAudio = async (post: Post) => {
    const track: Track = {
        url: BASE_URL + 'static/' + post.url + '/out.mpd',
        type: TrackType.Dash,
        title: post.title,  
    }
    console.log(post.url)
    console.log(track)
    await TrackPlayer.setQueue([track]);
    TrackPlayer.play();
}

const INTERATION_SIZE = 20

function PostCards({post, onClick }: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.parent}>
            <Text style={styles.author}>{post.username}</Text>
            <View style={styles.info}>
                <View style={styles.image}></View>
                <TouchableOpacity onPress={() => { playAudio(post)}} style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{post.title}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.interactionPanel}>
                <View style={styles.interaction}>
                    <Icon name='sine-wave' size={INTERATION_SIZE} color={theme.label} />
                    <Text style={styles.interactionLabel}>40K</Text>
                </View>
                <View style={styles.interaction}>
                    <Icon name='comment-outline' size={INTERATION_SIZE} color={theme.label} />
                    <Text style={styles.interactionLabel}>50K</Text>
                </View>
                <View style={styles.interaction}>
                    <Icon name='heart-outline' size={INTERATION_SIZE} color={theme.label} />
                    <Text style={styles.interactionLabel}>30K</Text>
                </View>
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingBottom: 15,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    author: {
        color: theme.label,
        marginBottom: 2,
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
        backgroundColor: theme.primary,
        borderRadius: 20,
    },
    title: {
        color: theme.text,
        fontSize: 17,
        flex: 1,
    },
    interactionPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    interaction: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    interactionLabel: {
        fontSize: 15,
        color: theme.label,
        marginLeft: 10
    }
})


export default memo(PostCards);